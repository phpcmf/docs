<?php

namespace Phpcmf\Docs\Model;

use Flarum\Database\AbstractModel;
use Flarum\Database\ScopeVisibilityTrait;
use Flarum\User\User;

class Doc extends AbstractModel
{
    use ScopeVisibilityTrait;

    protected $table = 'docs';

    protected $dates = [
        'created_at',
        'updated_at'
    ];

    protected $fillable = [
        'title',
        'content',
        'slug',
        'is_published',
        'category_id',
        'user_id',
        'order'
    ];

    public function author()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function category()
    {
        return $this->belongsTo(DocCategory::class);
    }
}
    