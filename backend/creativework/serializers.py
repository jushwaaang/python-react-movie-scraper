from rest_framework import serializers
from .models import CreativeWork

class CreativeWorkSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreativeWork
        fields = '__all__'