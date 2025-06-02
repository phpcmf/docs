<?php

namespace phpcmf\docs\Command;

use Flarum\User\User;

class CreateDocCommand
{
    public $actor;
    public $data;

    public function __construct(User $actor, array $data)
    {
        $this->actor = $actor;
        $this->data = $data;
    }
}