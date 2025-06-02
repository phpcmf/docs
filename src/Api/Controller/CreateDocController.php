<?php

namespace phpcmf\docs\Api\Controller;

use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use phpcmf\docs\Api\Serializer\DocSerializer;
use phpcmf\docs\Command\CreateDocCommand;
use Illuminate\Contracts\Bus\Dispatcher;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class CreateDocController extends AbstractCreateController
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
        $data = Arr::get($request->getParsedBody(), 'data.attributes', []);

        return $this->bus->dispatch(
            new CreateDocCommand($actor, $data)
        );
    }
}