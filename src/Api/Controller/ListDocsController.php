<?php

namespace phpcmf\docs\Api\Controller;

use Flarum\Api\Controller\AbstractListController;
use Flarum\Http\RequestUtil;
use phpcmf\docs\Api\Serializer\DocSerializer;
use phpcmf\docs\Doc\Doc;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class ListDocsController extends AbstractListController
{
    public $serializer = DocSerializer::class;

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);

        return Doc::where('is_published', true)
            ->orWhere('user_id', $actor->id)
            ->orderBy('created_at', 'desc')
            ->get();
    }
}