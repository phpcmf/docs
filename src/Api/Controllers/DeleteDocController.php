<?php

namespace Phpcmf\Docs\Api\Controllers;

use Flarum\Api\Controller\AbstractDeleteController;
use Flarum\Http\RequestUtil;
use Phpcmf\Docs\Model\Doc;
use Psr\Http\Message\ServerRequestInterface;

class DeleteDocController extends AbstractDeleteController
{
    protected function delete(ServerRequestInterface $request)
    {
        $actor = RequestUtil::getActor($request);
        $id = array_get($request->getQueryParams(), 'id');
        $doc = Doc::findOrFail($id);

        $actor->assertCan('delete', $doc);

        $doc->delete();
    }
}
    