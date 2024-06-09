from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CreativeWorkViewSet

router = DefaultRouter()
router.register(r'', CreativeWorkViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
