import { Injectable } from '@nestjs/common';
import { PrefixQuery } from '../../application/query/prefix.query';

@Injectable()
export class PrefixQueryImplement implements PrefixQuery {}
