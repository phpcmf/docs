<?php

namespace phpcmf\docs\Command;

use Flarum\User\User;

class DeleteDocCommand
{
    public $id;
    public $actor;

    public function __construct($id, User $actor)
    {
        $this->id = $id;
        $this->actor = $actor;
    }
}