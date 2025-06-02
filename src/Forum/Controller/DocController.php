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

class DocController implements ControllerInterface
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
        $categorySlug = Arr::get($request->getAttributes(), 'category');
        $docSlug = Arr::get($request->getAttributes(), 'doc');

        try {
            $response = $this->api->withParentRequest($request)->get('/docs/'.$docSlug, [
                'include' => 'category'
            ]);
        } catch (\Exception $e) {
            return new RedirectResponse($this->url->to('forum')->route('docs'));
        }

        $body = json_decode($response->getBody());
        $doc = $body->data ?? null;
        $category = $body->included[0] ?? null;

        if (!$doc || !$category || $category->attributes->slug !== $categorySlug) {
            return new RedirectResponse($this->url->to('forum')->route('docs'));
        }

        $view = resolve('flarum.view.forum');

        $view->setTemplate('phpcmf-docs::doc');
        $view->setVars([
            'doc' => $doc,
            'category' => $category,
            'actor' => $actor
        ]);

        return new HtmlResponse($view->render());
    }
}
    