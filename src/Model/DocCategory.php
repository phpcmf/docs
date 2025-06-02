<?php

namespace Phpcmf\Docs\Model;

use Flarum\Database\AbstractModel;
use Flarum\Database\ScopeVisibilityTrait;

class DocCategory extends AbstractModel
{
    use ScopeVisibilityTrait;

    protected $table = 'docs_categories';

    protected $dates = [
        'created_at',
        'updated_at'
    ];

    protected $fillable = [
        'title',
        'slug',
        'description',
        'is_published',
        'order'
    ];

    public function docs()
    {
        return $this->hasMany(Doc::class);
    }
}
    