<?php

namespace phpcmf\docs\Listeners;

use Flarum\Event\ConfigureApiRoutes;
use Illuminate\Contracts\Events\Dispatcher;

class AddDocsApi
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigureApiRoutes::class, [$this, 'configureApiRoutes']);
    }

    public function configureApiRoutes(ConfigureApiRoutes $event)
    {
        $event->get('/docs', 'docs.index', ListDocsController::class);
        $event->get('/docs/{id}', 'docs.show', ShowDocController::class);
        $event->post('/docs', 'docs.create', CreateDocController::class);
        $event->patch('/docs/{id}', 'docs.update', UpdateDocController::class);
        $event->delete('/docs/{id}', 'docs.delete', DeleteDocController::class);
    }
}