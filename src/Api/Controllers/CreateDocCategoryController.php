<?php

namespace Phpcmf\Docs\Api\Controllers;

use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Http\RequestUtil;
use Phpcmf\Docs\Model\DocCategory;
use Phpcmf\Docs\Api\Serializers\DocCategorySerializer;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class CreateDocCategoryController extends AbstractCreateController
{
    public $serializer = DocCategorySerializer::class;

    public $include = [
        'docs'
    ];

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertCan('createDocsCategories');

        $data = $request->getParsedBody()['data']['attributes'];

        $category = DocCategory::build(
            array_get($data, 'title'),
            array_get($data, 'description'),
            array_get($data, 'slug')
        );

        $category->is_published = (bool) array_get($data, 'isPublished', false);
        $category->order = (int) array_get($data, 'order', 0);

        $category->save();

        return $category;
    }
}
    