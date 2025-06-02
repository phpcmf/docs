<?php

namespace phpcmf\docs\Api\Controller;

use Flarum\Api\Controller\AbstractShowController;
use Flarum\Http\RequestUtil;
use phpcmf\docs\Api\Serializer\DocSerializer;
use phpcmf\docs\Doc\Doc;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class ShowDocController extends AbstractShowController
{
    public $serializer = DocSerializer::class;

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $id = Arr::get($request->getQueryParams(), 'id');
        $actor = RequestUtil::getActor($request);

        return Doc::where('id', $id)
            ->where(function ($query) use ($actor) {
                $query->where('is_published', true)
                    ->orWhere('user_id', $actor->id);
            })
            ->firstOrFail();
    }
}