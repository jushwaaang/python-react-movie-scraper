from rest_framework import viewsets, pagination, response
from rest_framework.decorators import action
from django.db.models import Q
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

    def get_queryset(self):
        queryset = super().get_queryset()
        search_query = self.request.query_params.get('s', None)
        source = self.request.query_params.get('source', None)
        
        if search_query:
            queryset = queryset.filter(Q(title__icontains=search_query))
        
        if source:
            queryset = queryset.filter(source=source)
        
        return queryset

    @action(detail=False, methods=['get'])
    def sources(self, request):
        unique_sources = CreativeWork.objects.values_list('source', flat=True).distinct()
        return response.Response(unique_sources)
