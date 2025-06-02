<?php

namespace Phpcmf\Docs\Api\Controllers;

use Flarum\Api\Controller\AbstractListController;
use Flarum\Http\RequestUtil;
use Phpcmf\Docs\Model\Doc;
use Phpcmf\Docs\Api\Serializers\DocSerializer;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class ListDocsController extends AbstractListController
{
    public $serializer = DocSerializer::class;

    public $include = [
        'author',
        'category'
    ];

    protected function data(ServerRequestInterface $request, Document $document)
    {
        RequestUtil::getActor($request)->assertCan('viewDocs');

        $query = Doc::query();

        $categoryId = array_get($request->getQueryParams(), 'filter.category');
        if ($categoryId) {
            $query->where('category_id', $categoryId);
        }

        $isPublished = array_get($request->getQueryParams(), 'filter.isPublished');
        if ($isPublished !== null) {
            $query->where('is_published', (bool) $isPublished);
        }

        return $query->orderBy('order', 'asc')->get();
    }
}
    