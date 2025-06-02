<?php

namespace phpcmf\docs\Api\Controller;

use Flarum\Api\Controller\AbstractShowController;
use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use phpcmf\docs\Api\Serializer\DocSerializer;
use phpcmf\docs\Command\UpdateDocCommand;
use Illuminate\Contracts\Bus\Dispatcher;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class UpdateDocController extends AbstractShowController
{
    public $serializer = DocSerializer::class;

    protected $bus;

    public function __construct(Dispatcher $bus)
    {
        $this->bus = $bus;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $id = Arr::get($request->getQueryParams(), 'id');
        $data = Arr::get($request->getParsedBody(), 'data.attributes', []);

        return $this->bus->dispatch(
            new UpdateDocCommand($id, $actor, $data)
        );
    }
}