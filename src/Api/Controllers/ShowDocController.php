<?php

namespace Phpcmf\Docs\Api\Controllers;

use Flarum\Api\Controller\AbstractShowController;
use Flarum\Http\RequestUtil;
use Phpcmf\Docs\Model\Doc;
use Phpcmf\Docs\Api\Serializers\DocSerializer;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class ShowDocController extends AbstractShowController
{
    public $serializer = DocSerializer::class;

    public $include = [
        'author',
        'category'
    ];

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertCan('viewDocs');

        $id = array_get($request->getQueryParams(), 'id');
        $doc = Doc::where('id', $id)->orWhere('slug', $id)->firstOrFail();

        return $doc;
    }
}
    