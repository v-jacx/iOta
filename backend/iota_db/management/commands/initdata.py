from django.core.management import BaseCommand, call_command
from iota_db.models import Profile
# from yourapp.models import User # if you have a custom user


class Command(BaseCommand):
    help = "DEV COMMAND: Fill databasse with a set of data for testing purposes"

    def handle(self, *args, **options):
        call_command('loaddata','mock_data')
        # Fix the passwords of fixtures
        for user in Profile.objects.all():
            user.set_password(user.password)
            user.save()