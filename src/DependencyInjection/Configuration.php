<?php

namespace Xapi\FSManager\DependencyInjection;

use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\ConfigurationInterface;

class Configuration implements ConfigurationInterface
{

    public function getConfigTreeBuilder(): TreeBuilder
    {
        $treeBuilder = new TreeBuilder('xapi_fs_manager');
        $treeBuilder->getRootNode()
            ->children()
                ->scalarNode("root_folder")->end()
                ->arrayNode('allow')
                    ->children()
                        ->booleanNode('upload')->end()
                        ->booleanNode('download')->end()
                        ->booleanNode('delete')->end()
                        ->booleanNode('move')->end()
                        ->booleanNode('compress')->end()
                    ->end()
                ->end()
            ->end();

        return $treeBuilder;
    }
}