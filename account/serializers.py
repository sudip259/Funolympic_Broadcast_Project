from ast import Not
import re
from rest_framework import serializers
from account.models import OlympicUser
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = OlympicUser
        fields = ['id','email','username']

# Creating register serializer
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=68, min_length=8,write_only=True)
    default_error_messages = {
        'username': 'Username fields only contain alphanumeric characters',}

    class Meta:
        model = OlympicUser
        fields = ['id','email', 'username', 'password']

    # password complexity checker method
    def validate(self, attrs):
        username = attrs.get('username', '')
        password = attrs.get('password', '') 

        # checking whether username field is alphanumaric
        if not username.isalnum():
            raise serializers.ValidationError(
                self.default_error_messages)
        # Rugular expression to check 0-9 character in password field
        if not re.findall('\d', password):
                raise serializers.ValidationError(
                    ("The password must contain at least 1 digit, 0-9."),
                    code='password_no_number',
                )
        # Rugular expression to check A-Z character in password field 
        if not re.findall('[A-Z]', password):
            raise serializers.ValidationError(
                ("The password must contain at least 1 uppercase letter, A-Z."),
                code='password_no_upper',
            )
        # Rugular expression to check a-z in password field 
        if not re.findall('[a-z]', password):
            raise serializers.ValidationError(
                ("The password must contain at least 1 lowercase letter, a-z."),
                code='password_no_lower',
            ) 
        # Rugular expression to check special character in password field
        if not re.findall('[()[\]{}|\\`~!@#$%^&*_\-+=;:\'",<>./?]', password):
            raise serializers.ValidationError(
                ("The password must contain at least 1 symbol: " +
                  "()[]{}|\`~!@#$%^&*_-+=;:'\",<>./?"),
                code='password_no_symbol',
            )   
        return attrs 

    def create(self, validated_data):
        return OlympicUser.objects.create_user(**validated_data)   

# Email verification serializer
class EmailVerificationSerializer(serializers.ModelSerializer):
    token = serializers.CharField(max_length=555)

    class Meta:
        model = OlympicUser
        fields = ['id','token']
# login serializer
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    refresh = serializers.CharField(read_only=True)
    access = serializers.CharField(read_only=True)
    username = serializers.CharField(read_only=True)
    email = serializers.EmailField(read_only=True)
    id = serializers.UUIDField(read_only=True)
    
    def validate(self, attrs):
        # The default result (access/refresh tokens)
        data = super(MyTokenObtainPairSerializer, self).validate(attrs)

        if not self.user.is_verified:
             raise serializers.ValidationError(
                ("User is not verified"),
                code='user verification required',
            ) 
        data.update(
            {
                "username": self.user.username,
                "email": self.user.email,
                "id": self.user.id,
            }
        )
        return data

# Reset password serializer
class ResetPasswordEmailRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(min_length=2)
    # redirect_url = serializers.CharField(max_length=500, required=False)
    class Meta:
        fields = ['email']

# setting new password serializer
class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(
        min_length=6, max_length=68, write_only=True)
    token = serializers.CharField(
        min_length=1, write_only=True)
    uidb64 = serializers.CharField(
        min_length=1, write_only=True)

    class Meta:
        fields = ['password', 'token', 'uidb64']

    def validate(self, attrs):
        try:
            password = attrs.get('password')
            token = attrs.get('token')
            uidb64 = attrs.get('uidb64')

            id = force_str(urlsafe_base64_decode(uidb64))
            user = OlympicUser.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed('The reset link is invalid', 401)
            user.set_password(password)
            if not user.is_verified:
                user.is_verified = True
            user.save()
            return (user)
        except Exception as e:
            raise AuthenticationFailed('The reset link is invalid', 401)







