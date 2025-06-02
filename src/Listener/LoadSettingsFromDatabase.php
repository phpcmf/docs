<?php

namespace Phpcmf\Docs\Listener;

use Flarum\Event\ConfigureModelDates;
use Flarum\Settings\Event\Deserializing;
use Flarum\Settings\Event\Serializing;
use Illuminate\Contracts\Events\Dispatcher;

class LoadSettingsFromDatabase
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(Serializing::class, [$this, 'onSerializing']);
        $events->listen(Deserializing::class, [$this, 'onDeserializing']);
    }

    public function onSerializing(Serializing $event)
    {
        $event->settings->set('phpcmf-docs.enableMarkdown', (bool) $event->settings->get('phpcmf-docs.enableMarkdown', false));
    }

    public function onDeserializing(Deserializing $event)
    {
        //
    }
}
    