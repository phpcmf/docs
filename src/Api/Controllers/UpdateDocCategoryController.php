<?php

namespace Phpcmf\Docs\Api\Controllers;

use Flarum\Api\Controller\AbstractShowController;
use Flarum\Http\RequestUtil;
use Phpcmf\Docs\Model\DocCategory;
use Phpcmf\Docs\Api\Serializers\DocCategorySerializer;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class UpdateDocCategoryController extends AbstractShowController
{
    public $serializer = DocCategorySerializer::class;

    public $include = [
        'docs'
    ];

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $id = array_get($request->getQueryParams(), 'id');
        $category = DocCategory::findOrFail($id);

        $actor->assertCan('edit', $category);

        $data = $request->getParsedBody()['data']['attributes'];

        if (array_key_exists('title', $data)) {
            $category->title = $data['title'];
        }

        if (array_key_exists('description', $data)) {
            $category->description = $data['description'];
        }

        if (array_key_exists('slug', $data)) {
            $category->slug = $data['slug'];
        }

        if (array_key_exists('isPublished', $data)) {
            $category->is_published = (bool) $data['isPublished'];
        }

        if (array_key_exists('order', $data)) {
            $category->order = (int) $data['order'];
        }

        $category->save();

        return $category;
    }
}
    