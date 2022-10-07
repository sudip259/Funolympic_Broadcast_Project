from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView,TokenVerifyView 
from account import views
from account.views import RequestPasswordResetEmail,SetNewPasswordAPIView,VerifyEmail,LoginAPIView,SignUpView,ResendVerifyEmail

# app level api routing
urlpatterns = [
    path('api/sign_up/', SignUpView.as_view(), name='sign_up'),
    path('api/log_in/', LoginAPIView.as_view(), name='log_in'), 
    path('api/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('api/resend_email/', ResendVerifyEmail.as_view(), name='resend_email'), 
    path('api/email-verify', VerifyEmail.as_view(), name="email-verify"),
    path('api/request-reset-email/', RequestPasswordResetEmail.as_view(), name="request-reset-email"),
    path('api/password-reset/', SetNewPasswordAPIView.as_view(), name='password-reset'),
    path('recaptcha/', views.recaptcha),
]