<?php

namespace phpcmf\docs;

use Flarum\Extend;
use phpcmf\docs\Api\Controller\CreateDocController;
use phpcmf\docs\Api\Controller\DeleteDocController;
use phpcmf\docs\Api\Controller\ListDocsController;
use phpcmf\docs\Api\Controller\ShowDocController;
use phpcmf\docs\Api\Controller\UpdateDocController;
use phpcmf\docs\Provider\DocsServiceProvider;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/less/docs.less')
        ->route('/docs', 'docs'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/less/docs.less'),

    new Extend\Locales(__DIR__.'/locale'),

    (new Extend\Routes('api'))
        ->get('/docs', 'docs.index', ListDocsController::class)
        ->get('/docs/{id}', 'docs.show', ShowDocController::class)
        ->post('/docs', 'docs.create', CreateDocController::class)
        ->patch('/docs/{id}', 'docs.update', UpdateDocController::class)
        ->delete('/docs/{id}', 'docs.delete', DeleteDocController::class),

    (new Extend\View)
        ->namespace('phpcmf-docs', __DIR__.'/views'),

    (new Extend\ServiceProvider())
        ->register(DocsServiceProvider::class),

    (new Extend\Settings)
        ->serializeToForum('phpcmf-docs.show_docs_link', 'phpcmf-docs.show_docs_link', 'boolval')
        ->serializeToForum('phpcmf-docs.docs_title', 'phpcmf-docs.docs_title')
        ->serializeToForum('phpcmf-docs.docs_description', 'phpcmf-docs.docs_description'),
];