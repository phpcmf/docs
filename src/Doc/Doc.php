<?php

namespace phpcmf\docs\Doc;

use Flarum\Database\AbstractModel;
use Flarum\User\User;

class Doc extends AbstractModel
{
    protected $table = 'docs';

    protected $dates = ['created_at', 'updated_at'];

    protected $fillable = ['title', 'slug', 'content', 'user_id', 'is_published'];

    public static function build($title, $slug, $content, $userId, $isPublished)
    {
        $doc = new static();
        $doc->title = $title;
        $doc->slug = $slug;
        $doc->content = $content;
        $doc->user_id = $userId;
        $doc->is_published = $isPublished;

        return $doc;
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}