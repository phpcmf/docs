<?php

namespace Phpcmf\Docs\Api\Serializers;

use Flarum\Api\Serializer\AbstractSerializer;
use Flarum\Api\Serializer\UserBasicSerializer;
use Phpcmf\Docs\Model\Doc;

class DocSerializer extends AbstractSerializer
{
    protected $type = 'docs';

    protected function getDefaultAttributes($doc)
    {
        if (! ($doc instanceof Doc)) {
            throw new InvalidArgumentException(
                get_class($this)." can only serialize instances of ".Doc::class
            );
        }

        return [
            'title'       => $doc->title,
            'content'     => $doc->content,
            'slug'        => $doc->slug,
            'isPublished' => (bool) $doc->is_published,
            'createdAt'   => $this->formatDate($doc->created_at),
            'updatedAt'   => $this->formatDate($doc->updated_at),
            'order'       => (int) $doc->order
        ];
    }

    protected function author($doc)
    {
        return $this->hasOne($doc, UserBasicSerializer::class);
    }

    protected function category($doc)
    {
        return $this->hasOne($doc, DocCategorySerializer::class);
    }
}
    