from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.documentation import include_docs_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/',include('api.urls')),
    # path('api/v2/',include('v2.urls')),
     path('docs/',include_docs_urls(title="Api documentation"))
]+ static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)