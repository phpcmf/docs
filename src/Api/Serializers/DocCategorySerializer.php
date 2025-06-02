<?php

namespace Phpcmf\Docs\Api\Serializers;

use Flarum\Api\Serializer\AbstractSerializer;
use Phpcmf\Docs\Model\DocCategory;

class DocCategorySerializer extends AbstractSerializer
{
    protected $type = 'docs-categories';

    protected function getDefaultAttributes($category)
    {
        if (! ($category instanceof DocCategory)) {
            throw new InvalidArgumentException(
                get_class($this)." can only serialize instances of ".DocCategory::class
            );
        }

        return [
            'title'       => $category->title,
            'description' => $category->description,
            'slug'        => $category->slug,
            'isPublished' => (bool) $category->is_published,
            'createdAt'   => $this->formatDate($category->created_at),
            'updatedAt'   => $this->formatDate($category->updated_at),
            'order'       => (int) $category->order
        ];
    }

    protected function docs($category)
    {
        return $this->hasMany($category, DocSerializer::class);
    }
}
    