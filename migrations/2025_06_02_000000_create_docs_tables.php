<?php

use Flarum\Database\Migration;

return Migration::createTable(
    'docs_categories',
    function ($table) {
        $table->increments('id');
        $table->string('title');
        $table->string('slug')->unique();
        $table->text('description')->nullable();
        $table->boolean('is_published')->default(false);
        $table->integer('order')->default(0);
        $table->timestamp('created_at');
        $table->timestamp('updated_at');
    }
);

return Migration::createTable(
    'docs',
    function ($table) {
        $table->increments('id');
        $table->string('title');
        $table->string('slug')->unique();
        $table->text('content');
        $table->integer('category_id')->unsigned();
        $table->integer('user_id')->unsigned();
        $table->boolean('is_published')->default(false);
        $table->integer('order')->default(0);
        $table->timestamp('created_at');
        $table->timestamp('updated_at');

        $table->foreign('category_id')->references('id')->on('docs_categories')->onDelete('cascade');
        $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
    }
);
    