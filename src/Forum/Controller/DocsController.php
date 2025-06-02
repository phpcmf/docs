<?php

namespace Phpcmf\Docs\Forum\Controller;

use Flarum\Api\Client;
use Flarum\Http\UrlGenerator;
use Flarum\Http\Controller\ControllerInterface;
use Psr\Http\Message\ServerRequestInterface;
use Zend\Diactoros\Response\RedirectResponse;
use Zend\Diactoros\Response\HtmlResponse;
use Laminas\Diactoros\Response\JsonResponse;
use Illuminate\Support\Arr;

class DocsController implements ControllerInterface
{
    protected $api;

    protected $url;

    public function __construct(Client $api, UrlGenerator $url)
    {
        $this->api = $api;
        $this->url = $url;
    }

    public function handle(ServerRequestInterface $request)
    {
        $actor = $request->getAttribute('actor');

        $response = $this->api->withParentRequest($request)->get('/docs-categories', [
            'filter' => [
                'isPublished' => true
            ]
        ]);

        $body = json_decode($response->getBody());
        $categories = $body->data ?? [];

        if (empty($categories) && $actor->can('createDocsCategories')) {
            return new RedirectResponse($this->url->to('admin')->route('extensions'));
        }

        $view = resolve('flarum.view.forum');

        $view->setTemplate('phpcmf-docs::docs');
        $view->setVars([
            'categories' => $categories,
            'actor' => $actor
        ]);

        return new HtmlResponse($view->render());
    }
}
    