module FakeDynamo
  class LocalSecondaryIndex
    extend Validation

    attr_accessor :name, :key_schema, :projection

    class << self
      def from_data(index_data, attribute_definitions, table_key_schema)
        index = LocalSecondaryIndex.new
        index.name = index_data['IndexName']
        index.key_schema = KeySchema.new(index_data['KeySchema'], attribute_definitions)
        index.projection = Projection.from_data(index_data['Projection'])
        validate_range_key(index.key_schema)
        validate_hash_key(index.key_schema, table_key_schema)
        index
      end
    end

    def description
      {'IndexName' => name,
        'IndexSizeBytes' => 0,
        'ItemCount' => 0,
        'KeySchema' => key_schema.description,
        'Projection' => projection.description}
    end
  end
end
