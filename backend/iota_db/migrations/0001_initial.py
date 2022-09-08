# Generated by Django 4.1 on 2022-09-04 00:09

from django.conf import settings
import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('birthday', models.DateField()),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('password', models.CharField(max_length=100)),
                ('private', models.BooleanField(default=False)),
                ('image', models.URLField(blank=True, null=True)),
                ('firstname', models.CharField(max_length=100)),
                ('lastname', models.CharField(max_length=100)),
                ('username', models.CharField(max_length=50, unique=True)),
                ('website', models.URLField(blank=True, null=True)),
                ('bio', models.TextField(blank=True, null=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('images', django.contrib.postgres.fields.ArrayField(base_field=models.URLField(blank=True, null=True), blank=True, size=None)),
                ('caption', models.TextField(blank=True, null=True)),
                ('likes', models.PositiveIntegerField(default=0)),
                ('post_creator', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='posts', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Follow',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('follow', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='followers', to=settings.AUTH_USER_MODEL)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='following', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField(null=True)),
                ('likes', models.PositiveIntegerField(default=0)),
                ('commentor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='creator', to=settings.AUTH_USER_MODEL)),
                ('post', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='iota_db.post')),
            ],
        ),
        migrations.AddField(
            model_name='profile',
            name='follow',
            field=models.ManyToManyField(blank=True, through='iota_db.Follow', to=settings.AUTH_USER_MODEL),
        ),
    ]