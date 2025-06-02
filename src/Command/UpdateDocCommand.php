<?php

namespace phpcmf\docs\Command;

use Flarum\User\User;

class UpdateDocCommand
{
    public $id;
    public $actor;
    public $data;

    public function __construct($id, User $actor, array $data)
    {
        $this->id = $id;
        $this->actor = $actor;
        $this->data = $data;
    }
}