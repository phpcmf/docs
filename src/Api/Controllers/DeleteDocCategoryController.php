<?php

namespace Phpcmf\Docs\Api\Controllers;

use Flarum\Api\Controller\AbstractDeleteController;
use Flarum\Http\RequestUtil;
use Phpcmf\Docs\Model\DocCategory;
use Psr\Http\Message\ServerRequestInterface;

class DeleteDocCategoryController extends AbstractDeleteController
{
    protected function delete(ServerRequestInterface $request)
    {
        $actor = RequestUtil::getActor($request);
        $id = array_get($request->getQueryParams(), 'id');
        $category = DocCategory::findOrFail($id);

        $actor->assertCan('delete', $category);

        $category->delete();
    }
}
    