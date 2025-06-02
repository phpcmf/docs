<?php

namespace phpcmf\docs\Api\Controller;

use Flarum\Http\RequestUtil;
use phpcmf\docs\Command\DeleteDocCommand;
use Illuminate\Contracts\Bus\Dispatcher;
use Psr\Http\Message\ServerRequestInterface;

class DeleteDocController
{
    protected $bus;

    public function __construct(Dispatcher $bus)
    {
        $this->bus = $bus;
    }

    public function handle(ServerRequestInterface $request)
    {
        $actor = RequestUtil::getActor($request);
        $id = Arr::get($request->getQueryParams(), 'id');

        $this->bus->dispatch(
            new DeleteDocCommand($id, $actor)
        );
    }
}