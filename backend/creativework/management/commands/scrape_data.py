import os
import json
from django.core.management.base import BaseCommand
from creativework.models import CreativeWork
from django.conf import settings

class Command(BaseCommand):
    help = 'Scrape data from JSON file and save it to the database'

    def handle(self, *args, **kwargs):
        # Open and read the JSON file
        file_paths = [
            os.path.join(settings.BASE_DIR, 'creativework', 'management', 'commands', 'gogoflix.json'),
            os.path.join(settings.BASE_DIR, 'creativework', 'management', 'commands', 'fmovies.json')
        ]

        for file_path in file_paths:
            self.stdout.write(self.style.SUCCESS(f'Scraping starting for {file_path}'))
            with open(file_path, 'r') as file:
                data = json.load(file)

            for item in data:
                for movie in item['result']['items']:
                    title = movie['extracted_item']['label']
                    page_url = movie['source']['url']
                    thumbnail_url = next((poster['source']['url'] for poster in movie['extracted_item']['posters'] if poster['type'] == 'image_format'), None)
                    source = item['endpoint_name']
                    type = movie['extracted_item']['type']

                    # Update existing record or create a new one
                    creative_work, created = CreativeWork.objects.update_or_create(
                        title=title,
                        defaults={
                            'page_url': page_url,
                            'thumbnail_url': thumbnail_url,
                            'source': source,
                            'type': type
                        }
                    )

                    if created:
                        self.stdout.write(self.style.SUCCESS(f'Created CreativeWork: {title}'))
                    else:
                        self.stdout.write(self.style.SUCCESS(f'Updated CreativeWork: {title}'))

            self.stdout.write(self.style.SUCCESS('Data scraped and saved successfully'))
