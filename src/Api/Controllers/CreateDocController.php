<?php

namespace Phpcmf\Docs\Api\Controllers;

use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Http\RequestUtil;
use Phpcmf\Docs\Model\Doc;
use Phpcmf\Docs\Api\Serializers\DocSerializer;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class CreateDocController extends AbstractCreateController
{
    public $serializer = DocSerializer::class;

    public $include = [
        'author',
        'category'
    ];

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertCan('createDocs');

        $data = $request->getParsedBody()['data']['attributes'];

        $doc = Doc::build(
            array_get($data, 'title'),
            array_get($data, 'content'),
            array_get($data, 'slug'),
            array_get($data, 'categoryId'),
            $actor->id
        );

        $doc->is_published = (bool) array_get($data, 'isPublished', false);
        $doc->order = (int) array_get($data, 'order', 0);

        $doc->save();

        return $doc;
    }
}
    