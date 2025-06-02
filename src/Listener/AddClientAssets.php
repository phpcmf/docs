<?php

namespace Phpcmf\Docs\Listener;

use Flarum\Event\ConfigureClientView;
use Flarum\Event\ConfigureWebApp;
use Illuminate\Contracts\Events\Dispatcher;

class AddClientAssets
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigureClientView::class, [$this, 'addAssets']);
        $events->listen(ConfigureWebApp::class, [$this, 'configureForumRoutes']);
    }

    public function addAssets(ConfigureClientView $event)
    {
        if ($event->isForum()) {
            $event->addAssets([
                __DIR__.'/../../js/dist/forum.js',
                __DIR__.'/../../less/forum.less'
            ]);
            $event->addBootstrapper('phpcmf/docs/main');
        }

        if ($event->isAdmin()) {
            $event->addAssets([
                __DIR__.'/../../js/dist/admin.js',
                __DIR__.'/../../less/admin.less'
            ]);
            $event->addBootstrapper('phpcmf/docs/admin');
        }
    }

    public function configureForumRoutes(ConfigureWebApp $event)
    {
        if ($event->isForum()) {
            $event->getContainer()->make('flarum.forum.routes')->add(
                'docs',
                '/docs',
                'Phpcmf\Docs\Forum\Controller\DocsController'
            );

            $event->getContainer()->make('flarum.forum.routes')->add(
                'docs.category',
                '/docs/{category}',
                'Phpcmf\Docs\Forum\Controller\DocsCategoryController'
            );

            $event->getContainer()->make('flarum.forum.routes')->add(
                'docs.doc',
                '/docs/{category}/{doc}',
                'Phpcmf\Docs\Forum\Controller\DocController'
            );
        }
    }
}
    