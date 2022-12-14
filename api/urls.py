from django.contrib import admin
from django.urls import path, include
# from django.contrib.auth import views as auth_views
from django.contrib.auth.views import PasswordResetView

urlpatterns = [
    path('admin/', admin.site.urls),
#      path(
#     'admin/password_reset/',
#     auth_views.PasswordResetView.as_view(),
#     name='admin_password_reset',
# ),
# path(
#     'admin/password_reset/done/',
#     auth_views.PasswordResetDoneView.as_view(),
#     name='password_reset_done',
# ),
# path(
#     'reset/<uidb64>/<token>/',
#     auth_views.PasswordResetConfirmView.as_view(),
#     name='password_reset_confirm',
# ),
# path(
#     'reset/done/',
#     auth_views.PasswordResetCompleteView.as_view(),
#     name='password_reset_complete',
# ),
    path('admin_password_reset/', PasswordResetView.as_view(), name='admin_password_reset'),
    path('', include('account.urls')),
    path('', include('funolympic.urls')),
    path('', include('wishlist.urls')),
    
]
