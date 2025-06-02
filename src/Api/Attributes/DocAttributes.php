<?php

namespace Phpcmf\Docs\Api\Attributes;

use Flarum\Api\Serializer\AbstractSerializer;
use Tobscure\JsonApi\AbstractSerializer as BaseSerializer;

class DocAttributes
{
    public function __invoke(AbstractSerializer $serializer, $doc, array $attributes)
    {
        $actor = $serializer->getActor();

        if ($actor->can('edit', $doc)) {
            $attributes['canEdit'] = true;
            $attributes['canDelete'] = $actor->can('delete', $doc);
        }

        return $attributes;
    }
}
    