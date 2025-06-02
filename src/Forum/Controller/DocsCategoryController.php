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

class DocsCategoryController implements ControllerInterface
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
        $slug = Arr::get($request->getQueryParams(), 'id', Arr::get($request->getAttributes(), 'id'));

        try {
            $response = $this->api->withParentRequest($request)->get('/docs-categories/'.$slug, [
                'include' => 'docs'
            ]);
        } catch (\Exception $e) {
            return new RedirectResponse($this->url->to('forum')->route('docs'));
        }

        $body = json_decode($response->getBody());
        $category = $body->data ?? null;

        if (!$category) {
            return new RedirectResponse($this->url->to('forum')->route('docs'));
        }

        $view = resolve('flarum.view.forum');

        $view->setTemplate('phpcmf-docs::category');
        $view->setVars([
            'category' => $category,
            'actor' => $actor
        ]);

        return new HtmlResponse($view->render());
    }
}
    