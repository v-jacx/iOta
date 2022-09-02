from django.conf.urls import include
from django.contrib import admin
from django.urls import path

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('api/', include('iota_db.urls')),
    path('api-auth', include('rest_framework.urls', namespace='rest_framework'))
]
