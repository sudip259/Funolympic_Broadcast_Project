from django.conf import settings
from rest_framework.views import APIView
import jwt
import requests
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken
from django.urls import reverse
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import smart_bytes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.throttling import UserRateThrottle

from rest_framework import generics
from account.models import OlympicUser
from account.renderers import UserRenderer

from account.utils import Util 
from .serializers import EmailVerificationSerializer, MyTokenObtainPairSerializer, RegisterSerializer, ResetPasswordEmailRequestSerializer, SetNewPasswordSerializer
from django.http import HttpResponsePermanentRedirect
from rest_framework.permissions import AllowAny

# Captcha verification 
# Captcha secret key needs to be taken from google console
@api_view(['POST'])
def recaptcha(request):
    r = requests.post(
      'https://www.google.com/recaptcha/api/siteverify',
      data={
        'secret': '6LdoLdwfAAAAAObDYcDv95HvfB9mlxc3WqvMzzvu',
        'response': request.data['captcha_value'],
      }
    )
    return Response({'captcha': r.json()})

# throttle to prevent api from DDoS Attack
class CustomUserRateThrottle(UserRateThrottle):
    rate= '1000/second'

# User registration view
class SignUpView(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    renderer_classes = (UserRenderer,)
    permission_classes=[AllowAny,]
    authentication_classes = []
    
    def post(self, request):
        user = request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user_data = serializer.data
        user = OlympicUser.objects.get(email=user_data['email'])
        token = RefreshToken.for_user(user).access_token
        current_site = 'localhost:3000'
        relativeLink = reverse('email-verify')
        absurl = 'http://'+current_site+relativeLink+"/token="+str(token)
        email_body = 'Hi '+user.username + \
            ' Use the link below to verify your email \n' + absurl
        data = {'email_body': email_body, 'to_email': user.email,
                'email_subject': 'Verify your email'}

        Util.send_email(data)
        return Response(user_data, status=status.HTTP_201_CREATED)
    

class CustomRedirect(HttpResponsePermanentRedirect):
    allowed_schemes = ['127.0.0.1:3000', 'http', 'https']    

# Email verification view
class VerifyEmail(APIView):
    serializer_class = EmailVerificationSerializer
    token_param_config = openapi.Parameter(
        'token', in_=openapi.IN_QUERY, description='Description', type=openapi.TYPE_STRING)

    @swagger_auto_schema(manual_parameters=[token_param_config])
    def post(self, request):
        token = request.GET.get('token')
        try:
            payload = jwt.decode(token, settings.SECRET_KEY,algorithms='HS256')
            print(payload)
            user = OlympicUser.objects.get(id=payload['id'])
            print(user)
            if not user.is_verified:
                user.is_verified = True
                user.save()
            return Response({'email': 'Successfully activated'}, status=status.HTTP_200_OK)
        except jwt.ExpiredSignatureError as identifier:
            return Response({'error': 'Activation Expired'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError as identifier:
            return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)    

# Resend Email verification link veiw
class ResendVerifyEmail(APIView):
    serializer_class = RegisterSerializer
    def post(self, request):
        data = request.data
        # email = data.get('email')
        email = data['email']
       
        try:
            user = OlympicUser.objects.get(email=email)
            if user.is_verified:
                return Response({'msg':'User is already verified'})
            token = RefreshToken.for_user(user).access_token
            # current_site= get_current_site(request).domain
            current_site= 'localhost:3000'
            relativeLink = reverse('email-verify')
            
            absurl = 'http://'+current_site+relativeLink+"/token="+str(token)
            email_body = 'Hi '+ user.username + ' this is the resent link to verify your email \n' + absurl

            data = {'email_body':email_body,'to_email':user.email,
                    'email_subject':'Verify your email'}
            Util.send_email(data)
            return Response({'msg':'The verification email has been sent'}, status=status.HTTP_201_CREATED)
        except OlympicUser.DoesNotExist:
            return Response({'msg':'No such user, register first'})            

# login view
class LoginAPIView(TokenObtainPairView):
    throttle_classes=[CustomUserRateThrottle]
    serializer_class = MyTokenObtainPairSerializer

#Send password reset link view
class RequestPasswordResetEmail(generics.GenericAPIView):
    serializer_class = ResetPasswordEmailRequestSerializer

    def post(self, request):
        # serializer = self.serializer_class(data=request.data)

        email = request.data.get('email', '')
        if OlympicUser.objects.filter(email=email).exists():
            user = OlympicUser.objects.get(email=email)
            uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            # current_site = get_current_site(
            #     request=request).domain
            current_site = 'localhost:3000'
            relativeLink = reverse('password-reset')
            # , kwargs={'uidb64': uidb64, 'token': token})
            
            absurl = 'http://'+current_site + relativeLink+str(token)+"/"+str(uidb64)
            email_body = 'Hello, \n Use link below to reset your password  \n' + \
                absurl
            data = {'email_body': email_body, 'to_email': user.email,
                    'email_subject': 'Reset your passsword'}
            Util.send_email(data)
        return Response({'success': 'We have sent you a link to reset your password'}, status=status.HTTP_200_OK)

# setting new password view
class SetNewPasswordAPIView(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'success': True, 'message': 'Password reset success'}, status=status.HTTP_200_OK)


