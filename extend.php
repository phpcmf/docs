<?php

use Flarum\Extend;
use Phpcmf\Docs\Api\Controllers;
use Phpcmf\Docs\Api\Serializers;
use Phpcmf\Docs\Listener;
use Phpcmf\Docs\Model\Doc;
use Phpcmf\Docs\Model\DocCategory;
use Illuminate\Contracts\Events\Dispatcher;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/less/forum.less'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/less/admin.less'),

    new Extend\Locales(__DIR__.'/locale'),

    (new Extend\Routes('api'))
        ->get('/docs', 'docs.index', Controllers\ListDocsController::class)
        ->get('/docs/{id}', 'docs.show', Controllers\ShowDocController::class)
        ->post('/docs', 'docs.create', Controllers\CreateDocController::class)
        ->patch('/docs/{id}', 'docs.update', Controllers\UpdateDocController::class)
        ->delete('/docs/{id}', 'docs.delete', Controllers\DeleteDocController::class)
        ->get('/docs-categories', 'docs-categories.index', Controllers\ListDocCategoriesController::class)
        ->get('/docs-categories/{id}', 'docs-categories.show', Controllers\ShowDocCategoryController::class)
        ->post('/docs-categories', 'docs-categories.create', Controllers\CreateDocCategoryController::class)
        ->patch('/docs-categories/{id}', 'docs-categories.update', Controllers\UpdateDocCategoryController::class)
        ->delete('/docs-categories/{id}', 'docs-categories.delete', Controllers\DeleteDocCategoryController::class),

    (new Extend\ApiSerializer(Serializers\DocSerializer::class))
        ->attributes(Phpcmf\Docs\Api\Attributes\DocAttributes::class),

    (new Extend\ApiSerializer(Serializers\DocCategorySerializer::class))
        ->attributes(Phpcmf\Docs\Api\Attributes\DocCategoryAttributes::class),

    (new Extend\Model(Doc::class))
        ->relationship('category', function($model) {
            return $model->belongsTo(DocCategory::class);
        }),

    (new Extend\Model(DocCategory::class))
        ->relationship('docs', function($model) {
            return $model->hasMany(Doc::class);
        }),

    (new Extend\Settings())
        ->serializeToForum('phpcmf-docs.enableMarkdown', 'phpcmf-docs.enableMarkdown', 'boolval', false),

    function (Dispatcher $events) {
        $events->subscribe(Listener\AddClientAssets::class);
        $events->subscribe(Listener\LoadSettingsFromDatabase::class);
    }
];
    