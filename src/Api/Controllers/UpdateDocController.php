<?php

namespace Phpcmf\Docs\Api\Controllers;

use Flarum\Api\Controller\AbstractShowController;
use Flarum\Http\RequestUtil;
use Phpcmf\Docs\Model\Doc;
use Phpcmf\Docs\Api\Serializers\DocSerializer;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class UpdateDocController extends AbstractShowController
{
    public $serializer = DocSerializer::class;

    public $include = [
        'author',
        'category'
    ];

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $id = array_get($request->getQueryParams(), 'id');
        $doc = Doc::findOrFail($id);

        $actor->assertCan('edit', $doc);

        $data = $request->getParsedBody()['data']['attributes'];

        if (array_key_exists('title', $data)) {
            $doc->title = $data['title'];
        }

        if (array_key_exists('content', $data)) {
            $doc->content = $data['content'];
        }

        if (array_key_exists('slug', $data)) {
            $doc->slug = $data['slug'];
        }

        if (array_key_exists('categoryId', $data)) {
            $doc->category_id = $data['categoryId'];
        }

        if (array_key_exists('isPublished', $data)) {
            $doc->is_published = (bool) $data['isPublished'];
        }

        if (array_key_exists('order', $data)) {
            $doc->order = (int) $data['order'];
        }

        $doc->save();

        return $doc;
    }
}
    