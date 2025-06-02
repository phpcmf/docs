<?php

namespace Phpcmf\Docs\Api\Attributes;

use Flarum\Api\Serializer\AbstractSerializer;
use Tobscure\JsonApi\AbstractSerializer as BaseSerializer;

class DocCategoryAttributes
{
    public function __invoke(AbstractSerializer $serializer, $category, array $attributes)
    {
        $actor = $serializer->getActor();

        if ($actor->can('edit', $category)) {
            $attributes['canEdit'] = true;
            $attributes['canDelete'] = $actor->can('delete', $category);
            $attributes['canCreateDoc'] = $actor->can('createDocs');
        }

        return $attributes;
    }
}
    