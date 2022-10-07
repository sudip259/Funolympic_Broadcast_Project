from django.contrib import admin
from django.contrib.auth.models import Group
from .models import OlympicUser
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.forms import UserCreationForm  

admin.site.register(OlympicUser)

# class UserAdmin(BaseUserAdmin):
#     add_form =  UserCreationForm

#     list_display = ('username', 'email')

#     fieldsets = (
#         (None, {'fields': ('username', 'email','password')}),
#     )

#     search_fields =  ('username', 'email')
#     ordering = ('username','email')

#     filter_horizontal = ()

# admin.site.register(OlympicUser, UserAdmin)
# admin.site.unregister(Group)
# admin.site.site_url = None