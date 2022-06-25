<?php

namespace Xapi\FSManager\Controllers;

use Symfony\Component\Finder\SplFileInfo;
use Symfony\Component\HttpFoundation\HeaderUtils;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Encoder\JsonEncode;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\SerializerInterface;


class AbstractController
{
    protected SerializerInterface $serializer;

    public function __construct(SerializerInterface $serializer)
    {
        $this->serializer = $serializer;
    }

    public function json($data): Response
    {
        $response = new Response(json_encode($data,JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }


    public function file(SplFileInfo $entry): Response
    {
        if($entry->isDir()){
            return $this->json([
                "status"=>"failed",
                "reason"=>"snapshot is dir",
                "message"=>"Can not allow to download dir"
            ]);
        }
        $fileContent = $entry->getContents();
        $response = new Response($fileContent);
        $disposition = HeaderUtils::makeDisposition(
            HeaderUtils::DISPOSITION_ATTACHMENT,
            $entry->getBasename()
        );
        $response->headers->set('Content-Disposition', $disposition);
        return $response;
    }
}