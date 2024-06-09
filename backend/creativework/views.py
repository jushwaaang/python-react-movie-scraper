from rest_framework import viewsets, pagination
from .models import CreativeWork
from .serializers import CreativeWorkSerializer

class CustomPagination(pagination.PageNumberPagination):
    page_size = 10  # Number of items per page
    page_size_query_param = 'page_size'
    max_page_size = 1000  # Maximum number of items per page

class CreativeWorkViewSet(viewsets.ModelViewSet):
    queryset = CreativeWork.objects.all().order_by('title')
    serializer_class = CreativeWorkSerializer
    pagination_class = CustomPagination
