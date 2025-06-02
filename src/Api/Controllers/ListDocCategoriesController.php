<?php

namespace Phpcmf\Docs\Api\Controllers;

use Flarum\Api\Controller\AbstractListController;
use Flarum\Http\RequestUtil;
use Phpcmf\Docs\Model\DocCategory;
use Phpcmf\Docs\Api\Serializers\DocCategorySerializer;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class ListDocCategoriesController extends AbstractListController
{
    public $serializer = DocCategorySerializer::class;

    public $include = [
        'docs'
    ];

    protected function data(ServerRequestInterface $request, Document $document)
    {
        RequestUtil::getActor($request)->assertCan('viewDocs');

        $query = DocCategory::query();

        $isPublished = array_get($request->getQueryParams(), 'filter.isPublished');
        if ($isPublished !== null) {
            $query->where('is_published', (bool) $isPublished);
        }

        return $query->orderBy('order', 'asc')->get();
    }
}
    