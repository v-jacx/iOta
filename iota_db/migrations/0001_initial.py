# Generated by Django 4.1 on 2022-09-02 21:52

import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Follow',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('birthday', models.DateField()),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('password', models.CharField(max_length=100)),
                ('private', models.BooleanField(default=False)),
                ('image', models.URLField(blank=True, null=True)),
                ('firstname', models.CharField(max_length=100)),
                ('lastname', models.CharField(max_length=100)),
                ('username', models.CharField(max_length=50)),
                ('website', models.URLField(blank=True, null=True)),
                ('bio', models.TextField(blank=True, null=True)),
                ('following', models.ManyToManyField(blank=True, through='iota_db.Follow', to='iota_db.profile')),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('images', django.contrib.postgres.fields.ArrayField(base_field=models.URLField(blank=True, null=True), blank=True, size=None)),
                ('caption', models.TextField(blank=True, null=True)),
                ('likes', models.PositiveIntegerField(null=True)),
                ('post_creator', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='posts', to='iota_db.profile')),
            ],
        ),
        migrations.AddField(
            model_name='follow',
            name='following',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='iota_db.profile'),
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField(null=True)),
                ('likes', models.PositiveIntegerField(null=True)),
                ('commentor_name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='iota_db.profile')),
                ('post', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='post', to='iota_db.post')),
            ],
        ),
    ]