<?php

namespace phpcmf\docs\Provider;

use Flarum\Foundation\AbstractServiceProvider;
use Illuminate\Contracts\Container\Container;
use phpcmf\docs\Doc\Doc;
use phpcmf\docs\Command\CreateDocHandler;
use phpcmf\docs\Command\DeleteDocHandler;
use phpcmf\docs\Command\UpdateDocHandler;

class DocsServiceProvider extends AbstractServiceProvider
{
    public function register()
    {
        $this->container->bind(
            'phpcmf.docs.create_handler',
            function (Container $container) {
                return new CreateDocHandler($container->make('events'));
            }
        );

        $this->container->bind(
            'phpcmf.docs.update_handler',
            function (Container $container) {
                return new UpdateDocHandler($container->make('events'));
            }
        );

        $this->container->bind(
            'phpcmf.docs.delete_handler',
            function (Container $container) {
                return new DeleteDocHandler($container->make('events'));
            }
        );

        $this->container->bind(
            'phpcmf.docs.repository',
            function (Container $container) {
                return new DocRepository($container->make('events'));
            }
        );
    }
}