<?php

namespace phpcmf\docs\Api\Serializer;

use Flarum\Api\Serializer\AbstractSerializer;
use Flarum\Api\Serializer\UserSerializer;
use phpcmf\docs\Doc\Doc;

class DocSerializer extends AbstractSerializer
{
    protected $type = 'docs';

    protected function getDefaultAttributes($doc)
    {
        if (!($doc instanceof Doc)) {
            throw new \InvalidArgumentException(
                get_class($this).' can only serialize instances of '.Doc::class
            );
        }

        return [
            'title'         => $doc->title,
            'slug'         => $doc->slug,
            'content'       => $doc->content,
            'createdAt'    => $this->formatDate($doc->created_at),
            'updatedAt'    => $this->formatDate($doc->updated_at),
            'isPublished' => $doc->is_published,
        ];
    }

    protected function user($doc)
    {
        return $this->hasOne($doc, UserSerializer::class);
    }
}