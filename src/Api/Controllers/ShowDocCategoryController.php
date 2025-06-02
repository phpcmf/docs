<?php

namespace Phpcmf\Docs\Api\Controllers;

use Flarum\Api\Controller\AbstractShowController;
use Flarum\Http\RequestUtil;
use Phpcmf\Docs\Model\DocCategory;
use Phpcmf\Docs\Api\Serializers\DocCategorySerializer;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class ShowDocCategoryController extends AbstractShowController
{
    public $serializer = DocCategorySerializer::class;

    public $include = [
        'docs'
    ];

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertCan('viewDocs');

        $id = array_get($request->getQueryParams(), 'id');
        $category = DocCategory::where('id', $id)->orWhere('slug', $id)->firstOrFail();

        return $category;
    }
}
    